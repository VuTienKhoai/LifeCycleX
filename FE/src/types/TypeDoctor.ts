import type { TypeUserResponse } from "./TypeUser";

export default interface TypeDoctor extends TypeUserResponse {
  idSpecialty?: string;
  nameSpecialty?: string;
  descriptionSpecialty?: string;
  position?: string;
}
