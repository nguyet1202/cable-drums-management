import SignInForm from "./SignInForm";
import {SignInText} from "./index";

type SignInProps={

}

function SignIn (props:SignInProps){
   return(
      <main className={`${style.wrapper}`}>
         <div className={`${style.innerWrapper}`}>
            <SignInText/>
            <SignInForm/>
         </div>
      </main>
   )
}

const style = {
   wrapper: "w-full flex justify-center items-center lg:h-[100vh] bg-[#F6F6F6] lg:justify-between  px-[300px]",
   innerWrapper: "w-full flex gap-[40px] justify-center items-center xxs:flex-col lg:flex-row lg:gap-0 lg:justify-between h-auto",
   image:{
      width:"w-[200px]",
      wrapperStyles:" xs:w-[250px] sm:w-[300px] md:w-[350px] xl:w-[400px] 2xl:w-[450px]"
   }
}
export default SignIn
export {type SignInProps}