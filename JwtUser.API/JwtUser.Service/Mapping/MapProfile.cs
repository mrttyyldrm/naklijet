using AutoMapper;
using JwtUser.Core.DTOs.Request;
using JwtUser.Core.DTOs.Response;
using JwtUser.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtUser.Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Cars, CarsDto>().ReverseMap();
            CreateMap<Personal, PersonalDto>().ReverseMap();
            CreateMap<AppUser, AppUserDto>().ReverseMap();
            CreateMap<Personal, AddPersonelDto>().ReverseMap();
            CreateMap<Application, AddApplicationDto>().ReverseMap();
            CreateMap<Application, GetListApplicationDto>().ReverseMap();
            CreateMap<Transport, AddTransportCityDto>().ReverseMap();
            CreateMap<Message, AddMessageDto>().ReverseMap();
        }
    }
}
