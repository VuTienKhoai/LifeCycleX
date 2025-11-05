import type TypeBaseEntity from "./BaseEntity";

export interface TypeUser extends TypeBaseEntity {}

export interface TypeUserResponse extends TypeBaseEntity {
  name?: string | null; // string? => string | null
  email: string; // string (required)
  gender?: string | null; // string? => string | null
  birthOfDay?: string | null; // DateTime? => ISO string | null
  phoneNumber: string; // string (required)
  address?: string | null; // string? => string | null
  avatar?: string | null; // string? => string | null (URL)
  role: string; // string (required)
  token: string; // string (required)
}
