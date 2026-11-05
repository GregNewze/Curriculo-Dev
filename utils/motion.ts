/**
 * Preferência de animação. O script inline do <head> (nuxt.config) põe a classe `calm` no
 * <html> quando o sistema pede menos movimento ou quando o visitante desligou as animações.
 * O botão do menu grava a escolha em localStorage e recarrega a página.
 */
export function isCalm(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('calm')
}

export function setMotion(on: boolean) {
  try {
    localStorage.setItem('motion', on ? 'on' : 'off')
  } catch {
    // Sem storage (modo privado): a escolha só vale até recarregar.
  }
  document.documentElement.classList.toggle('calm', !on)
  window.location.reload()
}
