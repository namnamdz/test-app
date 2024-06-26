export type UserProfile = {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
  email?: string;
  dob?: string;
  phone?: string;
  gender?: string;
  type?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
  profile_img?: string;
  login_type?: string;
};

export type LoginType = {
  userName: string;
  password: string;
  confirmPassword?: string;
};
