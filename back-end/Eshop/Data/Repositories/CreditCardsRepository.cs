﻿using Eshop.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Data.Repositories
{
    public class CreditCardsRepository : ICreditCardsRepository
    {
        protected readonly Context Context;

        protected DbSet<CreditCard> ItemSet { get; }

        public CreditCardsRepository(Context context)
        {
            ItemSet = context.CreditCards;
            Context = context;
        }

        protected IQueryable<CreditCard> IncludeDependencies(IQueryable<CreditCard> queryable)
        {
            return queryable;
        }

        public async Task<CreditCard> GetByNumber(string number)
        {
            var item = await IncludeDependencies(ItemSet).FirstOrDefaultAsync(x => x.Number == number);

            return item;
        }

        public virtual async Task<bool> Update(CreditCard creditCard)
        {
            ItemSet.Attach(creditCard);
            var changes = await Context.SaveChangesAsync();
            return changes > 0;
        }
    }
}