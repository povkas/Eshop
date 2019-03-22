using System;
using System.Net;
using System.Threading.Tasks;
using Eshop.ExceptionHandling;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Eshop.Configurations
{
    public class CustomExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            var customException = exception as BaseCustomException;
            var statusCode = (int)HttpStatusCode.InternalServerError;
            var message = "Unexpected error";
            var status = HttpStatusCode.InternalServerError.ToString();
            if (null != customException)
            {
                message = customException.Message;
                status = customException.Status;
                statusCode = customException.Code;
            }

            response.ContentType = "application/json";
            response.StatusCode = statusCode;
            await response.WriteAsync(JsonConvert.SerializeObject(new CustomErrorResponse
            {
                Message = message,
                Status = status
            }));
        }
    }
}
