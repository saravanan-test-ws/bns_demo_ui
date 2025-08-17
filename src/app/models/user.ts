export class User {
  userId?: number;
  firstName: string = '';
  lastName: string = '';
  startDate?: string;
  endDate?: string;
  effectiveDate?: string;
  role?: string;
  status?: string;
  emailId: string = '';
  contactNum?: string;
  password?: string;
  crtTs?: string;
  uptTs?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

}