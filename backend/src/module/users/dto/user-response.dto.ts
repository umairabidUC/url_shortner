import { Expose } from 'class-transformer';
 
export class UserResponseDto {
  @Expose()
  id: string;
 
  @Expose()
  email: string;
 
  @Expose()
  role_id: string;
 
  @Expose()
  created_at: Date;
 
  @Expose()
  updated_at: Date;

  @Expose()
  username: string;
}