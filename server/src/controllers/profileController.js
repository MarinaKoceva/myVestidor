import { Router } from "express";
import { getProfile, updateProfile } from "../services/profileService.js";
import { createErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await getProfile(userId);

        res.json({ _id: user._id, email: user.email, username: user.username });
    } catch (error) {
        res.status(404).json({ message: createErrorMsg(error) });
    }
});

router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { email, username } = req.body;

    try {
        const updatedUser = await updateProfile(email, username, userId);

        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: createErrorMsg(error) });
    }
})

export default router;