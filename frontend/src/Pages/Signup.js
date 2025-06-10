import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signup.css";

const Signup = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("백엔드 URL:", process.env.REACT_APP_BACKEND_URL);

  const navigate = useNavigate();

  // 입력 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    email: "",
    pw: "",
    pwConfirm: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 및 비밀번호 유효성 검사 함수
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@kw\.ac\.kr$/.test(email);
  const validatePassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // 이메일 변경 시 인증 초기화
    if (e.target.name === "email") {
      setIsEmailVerified(false);
      setIsCodeSent(false);
      setErrors((prev) => ({
        ...prev,
        email: "",
        emailDuplicate: "",
        emailServer: "",
      }));
    }
  };

  // 이메일 인증 코드 요청
  const handleEmailVerificationRequest = async () => {
    setErrors({});
    setIsLoading(true); // 로딩 시작

    if (!validateEmail(formData.email)) {
      setErrors({ email: "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다." });
      setIsLoading(false); // 로딩 종료
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/login/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("인증 코드가 이메일로 전송되었습니다.");
        setIsCodeSent(true);
      } else {
        if (data.error?.includes("이미 가입된 이메일")) {
          setErrors({ emailDuplicate: data.error });
        } else {
          setErrors({ emailServer: data.error || "이메일 인증 요청 실패" });
        }
      }
    } catch (error) {
      setErrors({
        emailServer: "서버 오류로 이메일 인증 요청에 실패했습니다.",
      });
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async () => {
    setErrors({});

    try {
      const response = await fetch(`${BACKEND_URL}/api/login/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerified(true);
      } else {
        setErrors({
          emailServer: data.message || "인증 코드가 올바르지 않습니다.",
        });
      }
    } catch (error) {
      setErrors({
        emailServer: "서버 오류로 이메일 인증 요청에 실패했습니다.",
      });
    }
  };

  // 회원가입 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!formData.name) newErrors.name = "이름을 입력하세요.";
    if (!formData.type) newErrors.type = "관리자 유형을 선택하세요.";
    if (!validateEmail(formData.email))
      newErrors.email = "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다.";
    if (!formData.pw) newErrors.pw = "비밀번호를 입력하세요.";
    if (!isEmailVerified)
      newErrors.emailVerification = "이메일 인증을 완료하세요.";
    if (!validatePassword(formData.pw))
      newErrors.pw = "비밀번호는 최소 8자 이상, 영문+숫자를 포함해야 합니다.";
    if (formData.pw !== formData.pwConfirm)
      newErrors.pwConfirm = "비밀번호가 일치하지 않습니다.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("입력값을 확인하세요.");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/login/manager/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            pw: formData.pw,
            type: formData.type,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("회원가입 성공!");
        navigate("/");
      } else {
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 오류로 회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup__wrapper">
      <div className="signup">
        <header className="signup__header">
          <h1 className="signup__title">[광운대학교 관리자 페이지] 회원가입</h1>
        </header>

        <main className="signup__main">
          <form onSubmit={handleSubmit}>
            {/* 이름 입력 */}
            <div className="signup__input-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="성함을 입력해주세요."
                onChange={handleChange}
              />
            </div>

            <div className="error__block">
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* 관리자 유형 선택 */}
            <div className="signup__input-group">
              <label htmlFor="type">관리자 유형</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">관리자 유형을 선택하세요.</option>
                <option value="class_admin">
                  강의실예약 / 강의실 / 강의 관리자
                </option>
                <option value="ad_admin">공지 / 홍보글 관리자</option>
              </select>
            </div>

            <div className="error__block">
              {errors.type && <p className="error">{errors.type}</p>}
            </div>

            {/* 이메일 입력 및 인증 */}
            <div className="signup__input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="광운대학교 웹메일(@kw.ac.kr)을 입력해주세요."
              />
              <button
                type="button"
                className="verify-email"
                onClick={handleEmailVerificationRequest}
                disabled={isLoading}
              >
                {isLoading && <div className="spinner"></div>}
                {isLoading ? "전송 중..." : "이메일 인증"}
              </button>
            </div>

            {/* 인증 코드 입력 (이메일 인증 요청 후 표시됨) */}
            {isCodeSent && (
              <div className="signup__input-group">
                <label htmlFor="verificationCode">인증 코드</label>
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  placeholder="광운대학교 웹메일로 전송된 인증번호를 입력해주세요."
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="verify-email"
                >
                  인증 확인
                </button>
              </div>
            )}

            <div className="error__block">
              {errors.email && <p className="error">{errors.email}</p>}
              {errors.emailDuplicate && (
                <p className="error">{errors.emailDuplicate}</p>
              )}
              {errors.emailVerification && (
                <p className="error">{errors.emailVerification}</p>
              )}
              {errors.emailServer && (
                <p className="error">{errors.emailServer}</p>
              )}
              {isEmailVerified && (
                <p className="success">인증이 완료되었습니다.</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="signup__input-group">
              <label htmlFor="pw">비밀번호</label>
              <input
                type="password"
                name="pw"
                value={formData.pw}
                placeholder="비밀번호를 입력하세요."
                onChange={handleChange}
              />
            </div>

            <div className="error__block">
              {errors.pw && <p className="error">{errors.pw}</p>}
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="signup__input-group">
              <label htmlFor="pwConfirm">비밀번호 확인</label>
              <input
                type="password"
                name="pwConfirm"
                value={formData.pwConfirm}
                placeholder="비밀번호를 다시 입력하세요."
                onChange={handleChange}
              />
            </div>

            <div className="error__block">
              {errors.pw && <p className="error">{errors.pw}</p>}
            </div>

            <div className="error__block">
              {errors.pwConfirm && <p className="error">{errors.pwConfirm}</p>}
            </div>

            {/* 회원가입 버튼 */}
            <button type="submit" className="signup-btn">
              회원가입
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Signup;
