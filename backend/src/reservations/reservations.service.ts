import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import axios from 'axios';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async create(dto: CreateReservationDto) {
    const supabase = this.supabaseService.getClient();

    // 1. Supabase'e kaydet
    const { data, error } = await supabase
      .from('reservations')
      .insert([
        {
          name: dto.name,
          phone: dto.phone,
          guests: dto.guests,
          date: dto.date,
          time: dto.time,
        },
      ])
      .select()
      .single();

    if (error) {
      this.logger.error('Supabase kayıt hatası:', error.message);
      throw new HttpException(
        'Rezervasyon kaydedilemedi. Lütfen tekrar deneyiniz.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 2. n8n Webhook'a bildir
    const webhookUrl = this.configService.get<string>('N8N_WEBHOOK_URL');
    if (webhookUrl) {
      try {
        await axios.post(webhookUrl, {
          id: data.id,
          name: dto.name,
          phone: dto.phone,
          guests: dto.guests,
          date: dto.date,
          time: dto.time,
          created_at: data.created_at,
        });
        this.logger.log('n8n webhook başarıyla tetiklendi.');
      } catch (webhookError) {
        this.logger.warn('n8n webhook hatası:', webhookError.message);
        // Webhook hatası rezervasyonu engellemez
      }
    }

    return {
      success: true,
      message: 'Rezervasyonunuz başarıyla alındı!',
      reservation: data,
    };
  }
}

