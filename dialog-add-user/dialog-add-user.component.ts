import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthdate: Date | undefined;
  //item$: Observable<any[]>
  firestore: Firestore = inject(Firestore);
  //items;

  constructor() {
   // const itemCollection = collection(this.firestore, 'users');
   // this.item$ = collectionData(itemCollection);
    // this.items = this.item$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element)
    //   });
    // })

  }

  onNoClick(){

  }


  async saveUser(){
    this.user.birthDate = this.birthdate?.getTime();
    console.log('user', this.user );

     await addDoc(this.getUsersRef(), this.user.toJSON())
     .catch((err) => {
      console.error(err)
     })
    .then((result:any) => {
      console.log('Adding user finished', result)
    })

    // this.firestore.collection(this.firestore, 'users')
    // .add(this.user.toJSON())
    // .than((result:any) => {
    //   console.log('Adding user finished', result)
    // })
  }


  getUsersRef(){
    return collection(this.firestore, 'users');
  }

  getSingelRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId)
  }
}
