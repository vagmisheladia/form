var isValidate = true;
         var users = [];

         if(localStorage.a_users){
             users = JSON.parse(localStorage.a_users);
             displayUser(users);
         }

         function createTable(user,table,rowid){
           var newRow = table.insertRow(rowid+1);
           var newcell1 = newRow.insertCell(0);
           var newcell2 = newRow.insertCell(1);
           var newcell3 = newRow.insertCell(2);
           var newcell4 = newRow.insertCell(3);
           var newcell5 = newRow.insertCell(4);
           var newcell6 = newRow.insertCell(5);

           newcell1.innerHTML = user.username;
           newcell2.innerHTML = user.password;
           newcell3.innerHTML = user.email;
           newcell4.innerHTML = user.location;
           newcell5.innerHTML = user.company;
           newcell6.innerHTML = user.gender;
         }


         function displayUser(users){
         var dcount = users.length
             if (dcount > 0)
             {
                 var table = document.getElementById("empTable");
                 for (i = 0; i < dcount; i++) {
                   createTable(users[i],table,i);
                  }
            }

         }

         function getCheckedRadio(radio_group) {
           for (var i = 0; i < radio_group.length; i++) {
               var button = radio_group[i];
               if (button.checked) {
                   return button.value;
               }
           }
           return undefined;
         }

         function removeElementsByClass(className){
           elements = document.getElementsByClassName(className);
           while(elements.length > 0){
             elements[0].parentNode.removeChild(elements[0]);
           }
         }

         function checkEmpty(control){
           var currElement = document.getElementById(control);
           if(currElement == undefined || currElement.value == "" ){
             document.querySelector('#'+control).insertAdjacentHTML('afterend', '<span class="error"> Please Enter '+control+' </span>');
             isValidate = false;
           }
         }

         function validateForm(){
           removeElementsByClass("error");
           checkEmpty('username');
           checkEmpty('password');
           checkEmpty('email');
           checkEmpty('location');
           checkEmpty('company');
           if(getCheckedRadio(document.getElementsByName('gender')) == undefined){
             var g = document.querySelector('#genderDv').insertAdjacentHTML('afterend', '<span class="error"> Please Select Gender </span>');
             isValidate = false;
           }
           return isValidate;
         }

         document.getElementById('btnSubmit').addEventListener('click',function() {

           if(validateForm()){
             var user ={
                 'username' : document.getElementById('username').value,
                 'password' : document.getElementById('password').value,
                 'email' : document.getElementById('email').value,
                 'location' : document.getElementById('location').value,
                 'company' : document.getElementById('company').value,
                 'gender' : getCheckedRadio(document.getElementsByName('gender'))
             };
             users.push(user);
             localStorage.a_users = JSON.stringify(users);
             var currentRow = users.length-1;
             var newtable = document.getElementById("empTable");
             createTable(user,newtable,currentRow);
           }
         });
