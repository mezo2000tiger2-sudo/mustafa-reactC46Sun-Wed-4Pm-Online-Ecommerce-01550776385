
import * as zod from "zod"


 export const updateuserdataschema = zod.object({
          name: zod.string().nonempty('name is required').min(3 , 'name is at least 3 characters')
          .max(7 , 'name is at most 7 characters'),
          phone: zod.string().nonempty('name is required').min(11 , 'phone is at least 11 characters')
          .max(11 , 'phone is at most 11 characters').regex(/^01[0125][0-9]{8}$/ , 'Invalid phone'),

          email: zod.string().nonempty('email is required')
          .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'invalid email'),


          
        })
