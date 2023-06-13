import React,{Fragment} from "react";

import { LoginForm, StarsCanvas } from "../components";

function LoginPage() {
  return (
    <div className="w-11/12 max-w-11/12 mx-auto">
      <div className='relative z-0'>
      <LoginForm />
      
      <StarsCanvas />
    </div>
    </div>
  );
}

export default LoginPage;
