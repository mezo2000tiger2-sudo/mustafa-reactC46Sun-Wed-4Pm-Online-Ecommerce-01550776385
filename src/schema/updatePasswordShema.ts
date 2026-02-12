
import * as zod from "zod"


 export const UpdatePasswordShema = zod.object({
          

          password: zod.string().nonempty('password is required')
          .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'password is invailid'),
          currentPassword: zod.string().nonempty('password is required')
          .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'current password is invailid'),

          
          rePassword: zod.string().nonempty('repassword is required')
        }).refine((data)=> data.password === data.rePassword ,{path:['rePassword'] , message:'repassword incorrect'}) ;
