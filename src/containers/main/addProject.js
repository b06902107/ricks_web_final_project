import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function addProject(){
    return (<div class="containerss" id="wrap">
        <h1 class="title"> NTU Grouping</h1>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
          <form action="r" method="post" accept-charset="utf-8" class="form" role="form">   <legend>Sign Up</legend>
                  <h4>It's free and always will be.</h4>
                  <div class="row">
                      <div class="col-xs-6 col-md-6">

                          <input type="text" name="firstname"  class="form-control input-lg" placeholder="First Name"  onChange/>                        </div>
                      <div class="col-xs-6 col-md-6">
                          <input type="text" name="lastname"  class="form-control input-lg" placeholder="Last Name"  />                        </div>


                  </div>


                  <div class="row">
                      <div class="col-xs-6 col-md-6">
                          <input type="text" name="major"  class="form-control input-lg" placeholder="系"  />                        </div>
                      <div class="col-xs-6 col-md-6">
                          <input type="text" name="grade"  class="form-control input-lg" placeholder="年級"  />                        </div>              
                  </div>



                  <input type="text" name="email"  class="form-control input-lg" placeholder="Email"  /><input type="password" name="password" class="form-control input-lg" placeholder="Password"  /><input type="password" name="confirm_password"  class="form-control input-lg" placeholder="Confirm Password"  />                                    

                  <br />
                  <button class="btn btn-lg btn-primary btn-block signup-btn" type="submit" >
                      Create my account</button>
          </form>          
</div>            
</div>
</div>)
}


export default addProject