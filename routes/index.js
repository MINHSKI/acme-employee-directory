const router = require('express').Router();
const db = require('../db');
const { Employee } = db.models;

router.use((req, res, next)=> {
  Employee.findAll()
    .then( employees => {
      const nickNameCount = employees.reduce((sum, employee)=> {
        return sum + employee.nicknames.length;
      }, 0);

      res.locals.employeeCount = employees.length;
      res.locals.nicknameCount = nickNameCount;
      res.locals.path = req.url;
      next();
    })
    .catch(next);

});
router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Home' });
});

router.get('/employees', ( req, res, next)=> {
  Employee.findAll()
    .then( employees => {
      res.render('employees', { title: 'Employees', employees});
    })
    .catch(next);
});

router.get('/employees/:id', (req, res, next)=> {
  Employee.findById(req.params.id)
    .then( employee => {
      if(!employee){
        return res.sendStatus(404);
      }
      res.render('employee', { employee, title: employee.fullName });
    })
    .catch(next);
});

router.post('/employees', (req, res, next)=> {
  const employee = req.body;
  Employee.create(employee)
    .then( employee => {
      res.redirect(`/employees/${employee.id}`);
    })
    .catch(next);
});

router.delete('/employees/:id', (req, res, next)=> {
  Employee.findById(req.params.id)
    .then( employee => {
      return employee.destroy();
    })
    .then(()=> {
      res.redirect('/employees');
    })
    .catch(next);
});

router.put('/employees/:id', (req, res, next)=> {
  Employee.findById(req.params.id)
    .then( employee => {
      Object.assign(employee, req.body);
      return employee.save();
    })
    .then(()=> {
      res.redirect('/employees');
    })
    .catch(next);
});


module.exports = router;
