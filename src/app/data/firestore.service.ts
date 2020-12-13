import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionName = 'documents';

  constructor(private db: AngularFirestore) {
  }

  public saveDocument(userId: string, document: string): Promise<void> {
    return this.db.collection(this.collectionName).doc(userId).set({ document });
  }

  public getDocument(userId: string): Observable<unknown> {
    return this.db.collection(this.collectionName).doc(userId).valueChanges();
  }
}
