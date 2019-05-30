using System.Net;

namespace Eshop.ExceptionHandling
{
    public class IncorrectInputException : BaseCustomException
    {
        public IncorrectInputException(string message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}