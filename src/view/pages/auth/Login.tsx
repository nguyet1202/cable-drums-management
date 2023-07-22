import LoginForm from "./LoginForm";
import LoginText from "./LoginText";

function Login (){
   return(
      <main className={`${style.wrapper}`}>
         <div className={`${style.innerWrapper}`}>
            <LoginText/>
            <LoginForm/>
         </div>
      </main>
   )
}

const style = {
   wrapper: "w-full flex justify-center items-center lg:h-[100vh] bg-[#F6F6F6] lg:justify-between  px-[300px]",
   innerWrapper: "w-full flex gap-[40px] justify-center items-center xxs:flex-col lg:flex-row lg:gap-0 lg:justify-between h-auto",
}
export default Login
