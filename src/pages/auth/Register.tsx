import SyncIllustration from '../../assets/undraw_sync.svg';
import RegisterForm from '@/components/forms/RegisterForm.tsx';
import {Link} from 'react-router-dom';

const Register = () => {
  return (
    <div
      className="flex flex-col-reverse justify-center items-center md:grid md:grid-cols-2 md:grid-rows-none md:place-items-center gap-2 min-h-screen">
      <div
        className="bg-primary w-full h-full flex justify-center items-center px-4 rounded-tr-[5400px] rounded-br-[200px]">
        <img src={SyncIllustration} alt="" className="size-[400px] md:size-[550px]" draggable={false}/>
      </div>
      <div className="w-auto m-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-1">Get Started!</h1>
        <p className="mb-5">Create your free account and start securely storing and managing your files in the cloud.</p>
        <div className="w-auto md:w-[400px] space-y-2">
          <RegisterForm/>
          <div className="flex gap-2">
            <p>Already have an account?</p>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
