export interface Chair {
    id: string;
    idCourse: string;
    profesor: string;
    startDate: Date;
    vacants: number;
    createdAt: Date;
  }
  
  export interface ChairDetail extends Chair {
    course?: string;
    idInscription?: string;
  }  