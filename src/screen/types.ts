export interface Question {
    id: string;
    text: string;
    type: 'single-choice' | 'text' | 'yes-no' | 'rating';
    options: string[];
    conditions?: { previousAnswer?: string };
  }
  
  export interface Poll {
    id: string;
    title: string;
    questions: Question[];
  }
  export interface ValidationRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  }
  
  export interface Option {
    label: string;
    value: string;
  }
  
  export interface FormField {
    id: string;
    label: string;
    fieldType: 'text' | 'email' | 'dropdown' | 'singleSelect' | 'multiSelect';
    placeholder?: string;
    options?: Option[];
    validation?: ValidationRules;
  }
  
  export interface FormData {
    [key: string]: any;
  }
  
  