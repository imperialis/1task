import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HelpCenterService } from './help-center.service';
import { CreateHelpCenterDto } from './dto/create-help-center.dto';
import { UpdateHelpCenterDto } from './dto/update-help-center.dto';
//import { RolesGuard } from 'src/guards/roles.guard'; // Adjust the path when it's created
//import { Roles } from 'src/decorators/roles.decorator'; // Adjust the path when it's created
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('help-center')
@ApiBearerAuth()
@Controller('help-center')
//@UseGuards(RolesGuard)
export class HelpCenterController {
  constructor(private readonly helpCenterService: HelpCenterService) {}


  @Patch('topics/:id')
  //@Roles('superadmin')
  @ApiOperation({ summary: 'Update a help center topic by id' })
  @ApiResponse({ status: 200, description: 'Topic updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized, please provide valid credentials' })
  @ApiResponse({ status: 403, description: 'Access denied, only authorized users can access this endpoint' })
  @ApiResponse({ status: 404, description: 'Topic not found, please check and try again' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(@Param('id') id: string, @Body() updateHelpCenterDto: UpdateHelpCenterDto) {
    try {
      const updatedHelpCenter = await this.helpCenterService.updateTopic(id, updateHelpCenterDto);
      return {
        success: true,
        message: 'Topic updated successfully',
        data: updatedHelpCenter,
        status_code: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException(
          {
            success: false,
            message: 'Unauthorized, please provide valid credentials',
            status_code: HttpStatus.UNAUTHORIZED,
          },
          HttpStatus.UNAUTHORIZED
        );
      } else if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(
          {
            success: false,
            message: 'Access denied, only authorized users can access this endpoint',
            status_code: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN
        );
      } else if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          {
            success: false,
            message: 'Topic not found, please check and try again',
            status_code: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND
        );
      } else {
        throw new HttpException(
          {
            success: false,
            message: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
  @Delete('topics/:id')
  //@Roles('superadmin')
  @ApiOperation({ summary: 'Delete a help center topic by id' })
  @ApiResponse({ status: 200, description: 'Topic deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized, please provide valid credentials' })
  @ApiResponse({ status: 403, description: 'Access denied, only authorized users can access this endpoint' })
  @ApiResponse({ status: 404, description: 'Topic not found, please check and try again' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id') id: string) {
    try {
      await this.helpCenterService.removeTopic(id);
      return {
        success: true,
        message: 'Topic deleted successfully',
        status_code: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException(
          {
            success: false,
            message: 'Unauthorized, please provide valid credentials',
            status_code: HttpStatus.UNAUTHORIZED,
          },
          HttpStatus.UNAUTHORIZED
        );
      } else if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(
          {
            success: false,
            message: 'Access denied, only authorized users can access this endpoint',
            status_code: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN
        );
      } else if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          {
            success: false,
            message: 'Topic not found, please check and try again',
            status_code: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND
        );
      } else {
        throw new HttpException(
          {
            success: false,
            message: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}

  // @Post()
  // //@Roles('superadmin')
  // @ApiOperation({ summary: 'Create a new help center topic' })
  // @ApiResponse({ status: 201, description: 'The help center topic has been successfully created.' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, please provide valid credentials' })
  // @ApiResponse({ status: 403, description: 'Access denied, only superadmins can access this endpoint' })
  // @ApiResponse({ status: 500, description: 'Internal Server Error' })
  // async create(@Body() createHelpCenterDto: CreateHelpCenterDto) {
  //   try {
  //     const newHelpCenter = await this.helpCenterService.createTopic(createHelpCenterDto);
  //     return {
  //       success: true,
  //       message: 'HelpCenter created successfully',
  //       data: newHelpCenter,
  //       status_code: HttpStatus.CREATED,
  //     };
  //   } catch (error) {
  //     if (error.name === 'QueryFailedError') {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Database error',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR
  //       );
  //     } else if (error.response) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: error.response.message,
  //           errors: error.response.errors,
  //         },
  //         error.status
  //       );
  //     } else {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'An unexpected error occurred',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR
  //       );
  //     }
  //   }
  // }

  // @Get()
  // //@Roles('superadmin', 'user')
  // @ApiOperation({ summary: 'Get all help center topics' })
  // @ApiResponse({ status: 200, description: 'Topics retrieved successfully' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, please provide valid credentials' })
  // @ApiResponse({ status: 403, description: 'Access denied, only authorized users can access this endpoint' })
  // @ApiResponse({ status: 500, description: 'Internal Server Error' })
  // async findAll() {
  //   try {
  //     const topics = await this.helpCenterService.findAllTopics();
  //     return {
  //       success: true,
  //       message: 'Topics retrieved successfully',
  //       data: topics,
  //       status_code: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     if (error.status === HttpStatus.UNAUTHORIZED) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Unauthorized, please provide valid credentials',
  //           status_code: HttpStatus.UNAUTHORIZED,
  //         },
  //         HttpStatus.UNAUTHORIZED
  //       );
  //     } else if (error.status === HttpStatus.FORBIDDEN) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Access denied, only authorized users can access this endpoint',
  //           status_code: HttpStatus.FORBIDDEN,
  //         },
  //         HttpStatus.FORBIDDEN
  //       );
  //     } else {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Internal Server Error',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR
  //       );
  //     }
  //   }
  // }

  // @Get(':id')
  // //@Roles('superadmin', 'user')
  // @ApiOperation({ summary: 'Get a help center topic by id' })
  // @ApiResponse({ status: 200, description: 'Topic retrieved successfully' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, please provide valid credentials' })
  // @ApiResponse({ status: 403, description: 'Access denied, only authorized users can access this endpoint' })
  // @ApiResponse({ status: 404, description: 'Topic not found, please check and try again' })
  // @ApiResponse({ status: 500, description: 'Internal Server Error' })
  // async findOne(@Param('id') id: string) {
  //   try {
  //     const topic = await this.helpCenterService.findOneTopic(id);
  //     return {
  //       success: true,
  //       message: 'Topic retrieved successfully',
  //       data: topic,
  //       status_code: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     if (error.status === HttpStatus.UNAUTHORIZED) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Unauthorized, please provide valid credentials',
  //           status_code: HttpStatus.UNAUTHORIZED,
  //         },
  //         HttpStatus.UNAUTHORIZED
  //       );
  //     } else if (error.status === HttpStatus.FORBIDDEN) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Access denied, only authorized users can access this endpoint',
  //           status_code: HttpStatus.FORBIDDEN,
  //         },
  //         HttpStatus.FORBIDDEN
  //       );
  //     } else if (error.status === HttpStatus.NOT_FOUND) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Topic not found, please check and try again',
  //           status_code: HttpStatus.NOT_FOUND,
  //         },
  //         HttpStatus.NOT_FOUND
  //       );
  //     } else {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Internal Server Error',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR
  //       );
  //     }
  //   }
  // }

  

 

//   @Get('topics')
//   //@Roles('superadmin', 'user')
//   @ApiOperation({ summary: 'Get all topics' })
//   @ApiResponse({ status: 200, description: 'Topics retrieved successfully' })
//   @ApiResponse({ status: 401, description: 'Unauthorized, please provide valid credentials' })
//   @ApiResponse({ status: 403, description: 'Access denied, only authorized users can access this endpoint' })
//   @ApiResponse({ status: 500, description: 'Internal Server Error' })
//   async getAllTopics() {
//     try {
//       const topics = await this.helpCenterService.findAllTopics();
//       return {
//         success: true,
//         message: 'Topics retrieved successfully',
//         topics,
//         status_code: HttpStatus.OK,
//       };
//     } catch (error) {
//       if (error.status === HttpStatus.UNAUTHORIZED) {
//         throw new HttpException(
//           {
//             success: false,
//             message: 'Unauthorized, please provide valid credentials',
//             status_code: HttpStatus.UNAUTHORIZED,
//           },
//           HttpStatus.UNAUTHORIZED
//         );
//       } else if (error.status === HttpStatus.FORBIDDEN) {
//         throw new HttpException(
//           {
//             success: false,
//             message: 'Access denied, only authorized users can access this endpoint',
//             status_code: HttpStatus.FORBIDDEN,
//           },
//           HttpStatus.FORBIDDEN
//         );
//       } else {
//         throw new HttpException(
//           {
//             success: false,
//             message: 'Internal Server Error',
//           },
//           HttpStatus.INTERNAL_SERVER_ERROR
//         );
//       }
//     }
//   }
// }
