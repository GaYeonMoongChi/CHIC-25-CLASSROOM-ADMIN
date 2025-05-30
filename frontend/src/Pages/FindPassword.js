import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/findPassword.css";

const Signup = () => {
  const BACKEND_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  // 비밀번호 입력 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    email: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@kw\.ac\.kr$/.test(email);

  // 비밀번호 유효성 검사 함수
  const validatePassword = (pw) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);
  };

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
      const response = await fetch(`${BACKEND_URL}/send-code`, {
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
      const response = await fetch(`${BACKEND_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode,
        }),
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

  // 비밀번호 재설정 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // 초기 입력값 확인
    let newErrors = {};
    if (!formData.name) newErrors.name = "이름을 입력하세요.";
    if (!formData.type) newErrors.type = "관리자 유형을 선택하세요.";
    if (!validateEmail(formData.email))
      newErrors.email = "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다.";
    if (!isEmailVerified)
      newErrors.emailVerification = "이메일 인증을 완료하세요.";
    if (!validatePassword(newPassword)) {
      newErrors.pw = "비밀번호는 최소 8자 이상, 영문+숫자를 포함해야 합니다.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPw = "비밀번호가 일치하지 않습니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("입력값을 확인하세요.");
      return;
    }

    try {
      // 사용자 정보 확인
      const checkResponse = await fetch(`${BACKEND_URL}/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          type: formData.type,
        }),
      });

      const checkData = await checkResponse.json();
      if (!checkResponse.ok) {
        alert(checkData.error || "사용자 정보 확인 실패");
        return;
      }

      // 비밀번호 재설정
      const resetResponse = await fetch(`${BACKEND_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          newPassword: newPassword,
        }),
      });

      const resetData = await resetResponse.json();
      if (resetResponse.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/login");
      } else {
        alert(resetData.error || "비밀번호 재설정 실패");
      }
    } catch (error) {
      alert("서버 오류로 비밀번호 재설정에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="find-password__wrapper">
      <div className="find-password">
        <header className="find-password__header">
          <h1 className="find-password__title">
            [광운대학교 관리자 페이지] 비밀번호 재설정
          </h1>
        </header>

        <main className="find-password__main">
          <form onSubmit={handleSubmit}>
            {/* 이름 입력 */}
            <div className="find-password__input-group">
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
            <div className="find-password__input-group">
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
            <div className="find-password__input-group">
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
              <div className="find-password__input-group">
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

            {/* 비밀번호 재설정 버튼 */}
            {!showPasswordForm && (
              <button
                type="button"
                className="find-password-btn"
                onClick={() => {
                  let newErrors = {};
                  if (!formData.name) newErrors.name = "이름을 입력하세요.";
                  if (!formData.type)
                    newErrors.type = "관리자 유형을 선택하세요.";
                  if (!validateEmail(formData.email))
                    newErrors.email =
                      "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다.";
                  if (!isEmailVerified)
                    newErrors.emailVerification = "이메일 인증을 완료하세요.";

                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    alert("입력값을 확인하세요.");
                    return;
                  }

                  setShowPasswordForm(true); // 폼 보여주기
                }}
              >
                비밀번호 재설정
              </button>
            )}

            {/* 새 비밀번호 설정폼 */}
            {showPasswordForm && (
              <>
                <div className="find-password__input-group">
                  <label htmlFor="newPassword">새 비밀번호</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    placeholder="8자 이상, 영문+숫자 포함"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="error__block">
                  {errors.pw && <p className="error">{errors.pw}</p>}
                </div>

                <div className="find-password__input-group">
                  <label htmlFor="confirmPassword">비밀번호 확인</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="비밀번호를 다시 입력해주세요."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="error__block">
                  {errors.confirmPw && (
                    <p className="error">{errors.confirmPw}</p>
                  )}
                </div>

                <button type="submit" className="find-password-btn">
                  새 비밀번호 설정 완료
                </button>
              </>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Signup;
