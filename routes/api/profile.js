const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth");

// const Profile = require("../../models/Profile")
const User = require("../../models/User")
const Post = require("../../models/Post")

// @route GET api/profile/me
// @desc Get current users profile
// @access Private

router.get("/me", auth, async(req, res) =>{
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate("user", ["name", "email"]);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route Post api/profile
// @desc create or update a profile
// @access Private

router.post("/", auth, async(req,res) =>{
    const{
        bio,
        location,
        facebook,
        twitter,
        instagram
    } = req.body

    const user1 = await User.findOne({_id: req.user.id})
    // profile object
    const profileObject ={}
    profileObject.user = req.user.id
    profileObject.name = user1.name
    if(bio) profileObject.bio = bio
    if(location) profileObject.location = location

    profileObject.social = {}
    if(facebook) profileObject.social.facebook = facebook
    if(twitter) profileObject.social.twitter = twitter
    if(instagram) profileObject.social.instagram = instagram

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if(profile){

            profile = await Profile.findOneAndUpdate(
               { user: req.user.id },
               { $set: profileObject },
               { new: true, upsert: true, useFindAndModify: false }
             );
             res.json(profile);
        }else{

            // Create
            const profile = new Profile(profileObject)
            await profile.save()
            res.json(profile)
        }
        
      }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
      }
})

// @route Get api/profile
// @desc get all profiles
// @access Private
router.get("/", auth, async(req,res)=>{
    try {
        const profiles = await Profile.find().populate("user", ["name"])
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

// @route Get api/profile/:id
// @desc get proile by id
// @access Private
router.get("/:id", auth, async(req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.id})
        
        if(!profile){
            res.status(400).json({msg: "There is no such profile"})
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

// @route delete api/profile/
// @desc delete proile, user, and post that belongs to user
// @access Private
router.delete("/", auth, async(req,res) =>{
    try {
    await Post.deleteMany({user: req.user.id})
    await Profile.findOneAndRemove({user: req.user.id})
    await User.findByIdAndRemove({_id: req.user.id})

    res.json({msg: "User Deleted"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

module.exports= router