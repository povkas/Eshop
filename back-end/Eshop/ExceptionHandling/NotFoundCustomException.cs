using System.Net;

namespace Eshop.ExceptionHandling
{
    public class NotFoundCustomException : BaseCustomException
    {
        public NotFoundCustomException(string message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}