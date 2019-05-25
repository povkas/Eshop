using System.Net;

namespace Eshop.ExceptionHandling
{
    public class FailedToCreateUserException : BaseCustomException
    {
        public FailedToCreateUserException(string message) : base(message, HttpStatusCode.UnprocessableEntity)
        {
        }
    }
}