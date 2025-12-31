import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://cqnkturiefvogmjxmpeq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbmt0dXJpZWZ2b2dtanhtcGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjQxNDEsImV4cCI6MjA4MjcwMDE0MX0.mVO8KnPoPyZH-EcTIq1JJHlAGT7deqdDlTNQ6HMRgDA'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form') // ou '#monForm' si id présent
  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const payload = {
      nom: formData.get('nom') || null,
      prenom: formData.get('prenom') || null,
      email: formData.get('email') || null,
      telephone: formData.get('telephone') || null
    }

    const { data, error } = await supabase
      .from('commandes')
      .insert([payload])
      .select() // optionnel : retour des lignes insérées

    if (error) {
      console.error('Erreur insertion:', error)
      alert('Erreur lors de l\'envoi. Regarde la console.')
      return
    }

    console.log('Enregistré:', data)
    alert('Commande envoyée !')
    form.reset()
  })
})