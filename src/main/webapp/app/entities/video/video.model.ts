import { BaseEntity } from './../../shared';

export class Video implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
    ) {
    }
}
