import React from 'react';
import { LogoIcon, CONTACT_INFO } from '../constants';
import { Category } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00050A] border-t border-white/5 pt-20 md:pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <LogoIcon />
              <div className="flex flex-col">
                <h2 className="text-2xl font-display font-bold text-white uppercase italic leading-none">Ótica <span className="text-brand-orange">Cdo</span></h2>
                <span className="text-brand-orange text-[7px] font-black tracking-[0.4em] uppercase">Fortaleza • Caucaia</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              Referência em saúde visual e curadoria de grifes no Ceará. Oferecemos precisão digital e atendimento humanizado em nossas unidades.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/oticacdo_fortaleza" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-orange transition-all group">
                <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.554-.789.306-1.459.717-2.126 1.384s-1.078 1.337-1.383 2.126c-.297.763-.498 1.634-.556 2.91-.058 1.28-.071 1.688-.071 4.948s.013 3.668.071 4.948c.058 1.276.259 2.147.556 2.911.305.789.716 1.458 1.383 2.125s1.337 1.079 2.126 1.384c.763.297 1.634.497 2.911.556 1.28.058 1.688.071 4.948.071s3.668-.013 4.948-.071c1.276-.058 2.147-.259 2.911-.556.789-.305 1.458-.717 2.125-1.384s1.079-1.337 1.384-2.126c.296-.763.497-1.634.556-2.911.058-1.28.071-1.688.071-4.948s-.013-3.668-.071-4.948c-.058-1.276-.259-2.147-.556-2.911-.305-.789-.717-1.459-1.384-2.126s-1.337-1.078-2.126-1.383c-.763-.296-1.634-.498-2.911-.556-1.28-.058-1.688-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all group">
                <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Coleções</h3>
            <ul className="space-y-4">
              {Object.values(Category).map(cat => (
                <li key={cat}>
                  <a href={`#vitrine`} className="text-white/40 hover:text-brand-orange transition-colors text-sm font-medium uppercase tracking-tighter">{cat}</a>
                </li>
              ))}
              <li><a href="#" className="text-white/40 hover:text-brand-orange transition-colors text-sm font-medium uppercase tracking-tighter">Claire Aguilar Signature</a></li>
              <li><a href="#" className="text-white/40 hover:text-brand-orange transition-colors text-sm font-medium uppercase tracking-tighter">Laboratório Digital</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Unidades</h3>
            <ul className="space-y-8">
              <li className="flex gap-4 group">
                <div className="text-brand-orange shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Fortaleza</span>
                  <p className="text-white/40 text-[11px] font-medium group-hover:text-white transition-colors">Centro de Fortaleza, CE</p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="text-brand-orange shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Caucaia</span>
                  <p className="text-white/40 text-[11px] font-medium group-hover:text-white transition-colors">Centro de Caucaia, CE</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Contato</h3>
            <div className="space-y-6">
               <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                 <p className="text-[9px] text-white/20 font-black uppercase mb-2">WhatsApp Geral</p>
                 <p className="text-white/80 text-sm font-bold">{CONTACT_INFO.phoneDisplay}</p>
                 <p className="text-white/40 text-[10px] mt-1 italic">Atendimento seg a sex 08h às 18h</p>
               </div>
               <div className="space-y-2">
                  <p className="text-white/20 text-[9px] font-black uppercase">Siga-nos</p>
                  <p className="text-white/60 text-[11px] font-bold">{CONTACT_INFO.instagramFortaleza}</p>
                  <p className="text-white/60 text-[11px] font-bold">{CONTACT_INFO.instagramCaucaia}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] text-center md:text-left">
            © 2024 Ótica Cdo Vision Group • Cia dos Óculos • Fortaleza & Caucaia.
          </p>
          <div className="flex gap-8 text-white/10 text-[9px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-brand-orange transition-colors">Políticas</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;