using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.Services
{
    public interface IMessageService
    {
        Task<bool> SendRegisterSuccessfullySms(string phoneNumber, string password);
    }
}
