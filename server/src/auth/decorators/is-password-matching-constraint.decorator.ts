import { RegisterDto } from '@auth/dto';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatchingConstraint
  implements ValidatorConstraintInterface
{
  validate(passwordRepeat: string, args?: ValidationArguments): boolean {
    const obj = args.object as RegisterDto;
    return obj.password === passwordRepeat;
  }
  defaultMessage?(): string {
    return 'Passwords do not match';
  }
}
