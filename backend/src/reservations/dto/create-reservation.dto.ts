import { IsString, IsNotEmpty, IsInt, Min, Max, Matches } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty({ message: 'Ad alanı zorunludur.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Telefon alanı zorunludur.' })
  @Matches(/^[0-9+\-\s()]{7,20}$/, { message: 'Geçerli bir telefon numarası giriniz.' })
  phone: string;

  @IsInt({ message: 'Kişi sayısı tam sayı olmalıdır.' })
  @Min(1, { message: 'En az 1 kişi olmalıdır.' })
  @Max(20, { message: 'En fazla 20 kişi olabilir.' })
  guests: number;

  @IsString()
  @IsNotEmpty({ message: 'Tarih alanı zorunludur.' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Saat alanı zorunludur.' })
  time: string;
}

