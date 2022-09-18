using System.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using RestSharp;
using System.Threading;

namespace Ben.Services
{
    
    public class MessageService : IMessageService
    {
        public async Task<bool> SendRegisterSuccessfullySms(string phoneNumber, string password)
        {
            try
            {
                var client = new RestClient("http://rest.ippanel.com/v1/messages/patterns/send");
                var request = new RestRequest(Method.POST);
                var cancellationToken = new CancellationToken();
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Authorization", "AccessKey  your auth key");
                request.AddParameter("undefined", "{\"pattern_code\" : \"e20mvl2btc\"" +
                ",\"originator\" : \"+983000505\"" +
                ",\"recipient\": \"" + phoneNumber + "\"" +
                ",\"values\" : {\"verification-code\": \"" + password + "\"}}"
                , ParameterType.RequestBody);

                var result = await client.ExecuteAsync(request, cancellationToken);
                if(result.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
