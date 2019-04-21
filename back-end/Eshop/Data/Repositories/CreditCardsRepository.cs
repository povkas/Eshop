using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Models;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Data.Repositories
{
    public class CreditCardsRepository : RepositoryBase<CreditCard>
    {
        protected override DbSet<CreditCard> ItemSet { get; }

        public CreditCardsRepository(Context context) : base(context)
        {
            ItemSet = context.CreditCards;
        }

        protected override IQueryable<CreditCard> IncludeDependencies(IQueryable<CreditCard> queryable)
        {
            return queryable;
        }

        public async Task<CreditCard> GetByNumber(string number)
        {
            var item = await IncludeDependencies(ItemSet).FirstOrDefaultAsync(x => x.Number == number);

            return item;
        }
    }
}
