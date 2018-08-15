const { Router } = require('express')

const router = Router()
const formidable = require("formidable");	
const debug = require('debug')('excel')
const multiparty = require('multiparty')
const xls2json = require("xls-to-json")
const nodemailer = require('nodemailer');


// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404 )
  }
})


router.post('/info', async (req, res, next) =>{
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files)=> {
    // console.log('fields',fields);//表单传递的input数据
    // console.log('files',files);//上传文件数据
    // console.log(fields.file);//上传文件数据
    files.file.forEach((data,index)=>{
      let { originalFilename, path, size } = data
      debug(`[文件名:${originalFilename}] [文件大小:${size}]`)
      debug(` [文件路径:${data}]`)
      // console.log(data)


      xls2json({
        input: path,
        output: __dirname + '/static',
        // sheet:"test"
    }, (err, result) => {
        if (err) {
            debug('转换json失败')
            res.send({
                success: -1
            })
        }
        debug(`转换json成功`)
        excelInfo = result
        res.send({
            success: 1,
            result
        })
    })
    })
  });
})

router.post('/sendEamil',async(req,res,next)=>{
  // console.log('send',req.body)
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports //465-SSL
    auth: {   //账号信息
      user: req.body.email, 
      pass: req.body.pass
      // user: "715181149@qq.com", 
      // pass: "yxtqtndhfenzbcdj"  
    }
  });


  req.body.list.map(item=>{
    // console.log('item',item)
      let tth=`<th>头</th>`,
          ttd=`<th>value</th>`;
      // console.log('key',item.工作邮箱)
      let arr = Object.keys(item);
      let arr2 = Object.values(item);
      let emailg='';

      for(let i=0;i<arr.length;i++){
        tth+=`<th>${arr[i]}</th>`
        ttd+=`<td>${arr2[i]}</td>`
        if(arr[i]=='工作邮箱'){
          emailg=arr2[i]
        }
      }
      let mailOptions = {
        from: '"duuliy" <715181149@qq.com>', // sender address //发送人
        // to: req.body.receiver, // list of receivers //收件人
        to:emailg,
        subject: '工资条来啦', // Subject line //邮件标题
        html:`<table border='1'>
        <tr>
          ${tth}
        </tr>
        <tr>
          ${ttd}
        </tr>
      </table>`
      };

      //send mail with defined transport object 执行发送邮件
      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
           console.log('error'+error);
           res.send(error)
        }else{
           res.send(info)
        }
      });

  })

  // send mail with defined transport object 执行发送邮件
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log('error'+error);
  //     res.send(error)
  //   }else{
  //     res.send(info)
  //   }
  // });
})

module.exports = router
