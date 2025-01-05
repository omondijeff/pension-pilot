export interface EmailTemplate {
    to: string
    subject: string
    body: string
  }
  
  export interface EmailResponse {
    message?: string
    error?: string
  }