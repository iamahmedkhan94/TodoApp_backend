import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string; // Add your custom property here
  }
}