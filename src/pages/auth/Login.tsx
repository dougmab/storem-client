import UploadIllustration from '../../assets/undraw_upload.svg';
import LoginForm from '@/components/forms/LoginForm.tsx';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div
      className="flex flex-col-reverse justify-center items-center md:grid md:grid-cols-2 md:grid-rows-none md:place-items-center gap-2 min-h-screen">
      <div
        className="bg-primary w-full h-full flex justify-center items-center px-4 rounded-tr-[200px] rounded-br-[600px]">
        <img src={UploadIllustration} alt="" className="size-[400px] md:size-[550px]" draggable={false}/>
      </div>
      <div className="w-auto m-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-1">Welcome back!</h1>
        <p className="mb-5">Access your files and continue where you left off. We're glad to have you here!</p>
        <div className="w-auto md:w-[400px] space-y-2">
          <LoginForm/>
          <div className="flex gap-2">
            <p>Don't have an account?</p>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
