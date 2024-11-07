// near.d.ts
import { providers } from 'near-api-js';
import { Observable } from 'rxjs';

// near.d.ts
declare module './near' {
  export default class Wallet {
    constructor(options: { networkId: string; createAccessKeyFor?: string });
    startUp(accountChangeHook: (accountId: string) => void): Promise<string>;
    signIn(): Promise<void>;
    signOut(): Promise<void>;
    viewMethod(options: { contractId: string; method: string; args?: Record<string, any> }): Promise<any>;
    callMethod(options: { contractId: string; method: string; args?: Record<string, any>; gas?: string; deposit?: string }): Promise<any>;
    getTransactionResult(txhash: string): Promise<any>;
  }
}

