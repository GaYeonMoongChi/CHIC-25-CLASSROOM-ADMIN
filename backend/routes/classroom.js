const express = require('express');
const router = express.Router();
const Classroom = require('../db/classroom');

// 강의실 정보 추가 (POST /api/classroom)
router.post('/', async (req, res) => {
    try {
        const newClassroom = new Classroom(req.body);
        await newClassroom.save();
        res.status(201).json({ message: '강의실 정보 추가 성공', data: newClassroom });
    } catch (error) {
        res.status(500).json({ message: '강의실 정보 추가 실패', error: error.message });
    }
});

// 강의실 정보 조회 (GET /api/classroom)
router.get('/', async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: '강의실 정보 조회 실패', error: error.message });
    }
});

// 특정 강의실 정보 조회 (GET /api/classroom/:building/:room)
// ex. api/classroom/기념관/203호
router.get('/:building/:room', async (req, res) => {
    try {
        const { building, room } = req.params;
        const classroom = await Classroom.findOne({ building, room });

        if (!classroom) {
            return res.status(404).json({ message: '강의실 정보를 찾을 수 없습니다.' });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(500).json({ message: '강의실 정보 조회 실패', error: error.message });
    }
});

// 강의실 정보 수정 (PUT /api/classroom/:building/:room)
router.put('/:building/:room', async (req, res) => {
    try {
        const { building, room } = req.params;
        const updatedClassroom = await Classroom.findOneAndUpdate(
            { building, room }, 
            req.body, 
            { new: true }
        );

        if (!updatedClassroom) {
            return res.status(404).json({ message: '강의실 정보를 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '강의실 정보 수정 성공', data: updatedClassroom });
    } catch (error) {
        res.status(500).json({ message: '강의실 정보 수정 실패', error: error.message });
    }
});

// 강의실 정보 삭제 (DELETE /api/classroom/:building/:room)
router.delete('/:building/:room', async (req, res) => {
    try {
        const { building, room } = req.params;
        const deletedClassroom = await Classroom.findOneAndDelete({ building, room });

        if (!deletedClassroom) {
            return res.status(404).json({ message: '강의실 정보를 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '강의실 정보 삭제 성공' });
    } catch (error) {
        res.status(500).json({ message: '강의실 정보 삭제 실패', error: error.message });
    }
});

module.exports = router;
