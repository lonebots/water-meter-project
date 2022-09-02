const express=require('express');
const check=require('../middlewares/check')

const {registerUser,login,getMe,logout,changeRate,updateDetails,getDetails,changePassword}=require('../controllers/auth');
const {protect,authorize}=require('../middlewares/auth')
const {payBill,getMyBill, getMyAllBill}=require('../controllers/bill')

const router=express.Router();

//User Auth
router.route('/register').post(check,authorize('admin'),registerUser);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout',protect, logout);
router.put('/updatedetails', protect, updateDetails);

//getiing the details of user
router.get('/mydata',protect,getDetails)


//changing rate
router.post('/changerate',protect,authorize('admin'),changeRate);

// getting and paying user bill
router.get('/getmybill',protect,getMyBill);
router.post('/paybill',payBill);
router.post('/changepassword',protect,changePassword);
router.get('/getmyallbill',protect,getMyAllBill);

module.exports=router;

