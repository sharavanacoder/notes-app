const Notes=require('../models/notes');

module.exports.renderNewNote=(req, res) => {
    res.render('notes/new');
}
module.exports.createNote=async (req, res) => {
    const { title, content }=req.body;
    const note=new Notes({ title, content });
    note.user=req.user._id;
    await note.save({ timestamps: { createdAt: true, updatedAt: false } });
    req.flash('success', 'Successfully created a new note!');
    res.redirect('/show');
}

module.exports.renderShowNotes=async (req, res) => {
    const notes=await Notes.find({ user: req.user._id });
    res.render('notes/show', { notes });
}

module.exports.renderEditNote=async (req, res) => {
    try {
        const { id }=req.params;
        const note=await Notes.findById(id);
        res.render('notes/edit', { note });
    } catch (e) { res.render('error'); }
}   
module.exports.editNote=async (req, res) => {
    try {
        const { title, content }=req.body;
        const note=await Notes.findById(req.params.id);
        note.title=title;
        note.content=content;
        await note.save({ timestamps: { createdAt: false, updatedAt: true } });
        req.flash('success', 'Successfully Note is Updated!');
        res.redirect('/show');
    }
    catch (e) {
        return res.redirect('/error');
    }
}
module.exports.deleteNote=async (req, res) => {
    try {
        await Notes.findByIdAndDelete(req.params.id);
        req.flash('success', 'Successfully Note is Deleted!!!');
        res.redirect('/show');
    }
    catch (e) {
        res.render('error');
    }
};