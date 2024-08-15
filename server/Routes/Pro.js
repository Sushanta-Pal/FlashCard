const exp=require("express")
const router=exp.Router()
const {getHome,getAbout}=require('../Control/pro')


router.route('/').get(getHome)
router.route('/about').get(getAbout)

module.exports=router;
