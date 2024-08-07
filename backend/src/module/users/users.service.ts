import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService){}
  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }
  findUser(email:string, password:string){
    const userFromDb = this.databaseService.user.findUnique({
      where: {
        email: email,
        password_hash: password 
      }
    })

    if(userFromDb) return userFromDb;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
