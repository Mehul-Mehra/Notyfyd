import LiveNote from '../models/LiveNote.js'

export const canAccessLiveNote = async (req,res,next) => {
    try{
        const userId = req.userId;
        const noteId = req.params.id;

        const liveNote = await LiveNote.findById(noteId);

        if(!liveNote){
            return res.status(404).json({
                message: "Live note not found"
            });
        }

        const isOwner = liveNote.owner.toString() === userId.toString();
        const isCollaborator = liveNote.collaborators.some(
            (collaborator) => {
                collaborator.toString() === userId.toString()
            }
        )
        if(!isOwner && !isCollaborator){
            return res.status(403).json({
                message: "You do not have access to this live note"
            });
        }

        req.liveNote = liveNote;

        next();
    }
    catch(error){
        console.error("Error at liveNote middleware",error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const isLiveNoteOwner = async (req, res, next) => {
    try{
        const userId = req.userId;
        const noteId = req.params.id;

        const liveNote = await LiveNote.findById(noteId);

        if(!liveNote){
            return res.status(404).json({
                message: "Live note not found"
            });
        }

        if(liveNote.owner.toString() !== userId.toString()){
            return res.status(403).json({
                message: "Only the owner can perform this action"
            });
        }

        req.liveNote = liveNote;

        next();
    }
    catch(error){
        console.error("Error at liveNote middleware",error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}