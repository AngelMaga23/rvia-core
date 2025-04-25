import { PartialType } from '@nestjs/swagger';
import { CreateAppAreaDto } from './create-app-area.dto';

export class UpdateAppAreaDto extends PartialType(CreateAppAreaDto) {}
