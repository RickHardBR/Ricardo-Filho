import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword } from "../error/customError";
import { UserInputDTO, user, LoginInputDTO } from "../model/user";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/generateId";
import { AuthenticationData } from "../model/AuthenticationData";

export class UserBusiness {
  public createUser = async (input: UserInputDTO): Promise<string> => {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(
          400,
          'Preencha os campos "email" e "password"'
        );
      }

      if (password.length < 8) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const id: string = generateId();

      const user: user = {
        id,
        email,
        password,
      };
      const userDatabase = new UserDatabase();
      await userDatabase.insertUser(user);

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({ id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(400, 'Preencha os campos "email" e "password"');
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserByEmail(email);
      const payload={id:user.id} as any

      if( password !== user.password){
        throw new InvalidPassword()
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({id: user.id})

      console.log("UserId "+ user.id);
      console.log("Payload "+ payload);

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };


  public getUserData=async(token:string): Promise<any>=> {
		try {
			if (!token) {
				throw new CustomError(400,"Por favor, passe o token no header da requisição");
			}

			const userDatabase = new UserDatabase();
			const authenticator = new Authenticator();
			const authenticationData = authenticator.getTokenData(token);

			const user = await userDatabase.getUserById(authenticationData.id);


			return user
		} catch (error: any) {
			throw new CustomError(400, error.message);
		      }
	      }
}
