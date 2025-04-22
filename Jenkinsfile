pipeline {
  agent any

  tools {
    nodejs 'NodeJs'
  }

  environment {
    GIT_REPO = 'https://github.com/wilsonsilvadeveloper/gestor_financeiro.git'
    NEXT_DISABLE_SWC_NATIVE = 'true'
    SHARP_IGNORE_GLOBAL_LIBVIPS = 'true'
  }

  stage('Debug') {
    steps {
      bat '''
        echo Pipeline está rodando corretamente.
        node -v
        npm -v
        node -p "process.arch"
        node -p "process.platform"
      '''
    }
  }


    stage('Preparar Ambiente') {
      steps {
        bat '''
          IF EXIST node_modules RMDIR /S /Q node_modules
          IF EXIST package-lock.json DEL /F /Q package-lock.json
        '''
      }
    }

    stage('Instalar Dependências') {
      steps {
        bat 'npm install --cpu=wasm32 sharp'
      }
    }

    stage('Build do Projeto') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Verificar Branch') {
      steps {
        bat '''
          for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
          echo Branch atual: %BRANCH%
        '''
      }
    }

    stage('Merge para main') {
      when {
        branch 'development'
      }
      steps {
        sshagent (credentials: ['ssh-github']) {
          bat '''
            git config user.name "wilsonsilvadeveloper"
            git config user.email "wilsonoficial.com@gmail.com"
            git fetch origin
            git checkout main
            git merge origin/development --no-edit
            git push origin main
          '''
        }
      }
    }
  }
}
