import { Injectable } from '@angular/core';
import { Datastore } from '@google-cloud/datastore';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  private datastore: Datastore;

  constructor() {
    this.datastore = new Datastore();
  }

  async getEntities(kind: string): Promise<any[]> {
    const query = this.datastore.createQuery(kind);

    const [entities] = await this.datastore.runQuery(query);

    return entities;
  }
}
